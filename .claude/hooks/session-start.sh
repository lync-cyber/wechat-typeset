#!/bin/bash
# Session start hook for Claude Code on the web.
# Ensures the cloud sandbox can run wechat-typeset's lint / typecheck / tests.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# package.json pins engines.node >=24; the default sandbox node is 22, so
# activate node 24 via the pre-installed nvm and persist it on PATH for the
# rest of the session via $CLAUDE_ENV_FILE.
export NVM_DIR="/opt/nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install 24 >/dev/null
  nvm use 24 >/dev/null
fi

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  NODE_BIN_DIR="$(dirname "$(command -v node)")"
  echo "export PATH=\"$NODE_BIN_DIR:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi

# Idempotent: npm install is a no-op when node_modules already matches the
# lockfile, but recovers if the lockfile changed or node_modules was wiped.
npm install --no-audit --no-fund

echo "session-start: node $(node -v), deps ready"
