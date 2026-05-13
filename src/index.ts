interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Code::Stats MCP — public user XP / activity.
 *
 * Auth: none for public profiles.
 * Docs: https://codestats.net/api-docs
 */


const BASE = 'https://codestats.net/api/users';
const UA = 'pipeworx-mcp-codestats/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'user',
    description: 'Public profile — total XP, per-language XP, per-machine XP.',
    inputSchema: {
      type: 'object',
      properties: { username: { type: 'string' } },
      required: ['username'],
    },
  },
  {
    name: 'recent',
    description: 'Recent coding activity (~last 12 hours) for a user.',
    inputSchema: {
      type: 'object',
      properties: { username: { type: 'string' } },
      required: ['username'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'user':
      return csGet(`/${encodeURIComponent(reqStr(args, 'username', '"Nicd"'))}`);
    case 'recent':
      return csGet(`/${encodeURIComponent(reqStr(args, 'username', '"Nicd"'))}?recent=true`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function csGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('Code::Stats: user not found');
  if (!res.ok) throw new Error(`Code::Stats: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
