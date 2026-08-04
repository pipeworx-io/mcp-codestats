# @pipeworx/codestats

[Code::Stats](https://codestats.net) public profile MCP — per-user coding XP across languages, machines, recent activity. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `user(username)` — profile + total XP, per-language XP, per-machine XP
- `recent(username)` — recent (last ~12h) coding activity

## Data source

`https://codestats.net/api/users/<name>` and `?recent=true` variant.

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "codestats": {
      "url": "https://gateway.pipeworx.io/codestats/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Codestats data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
