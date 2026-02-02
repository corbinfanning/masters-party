#!/bin/bash
# Setup script for Jane (OpenClaw) on a new machine
# Run: chmod +x setup-new-machine.sh && ./setup-new-machine.sh

set -e

echo "=== Jane Setup Script ==="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Install with: brew install node"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python3 not found."; exit 1; }
echo "✓ Node.js $(node --version)"
echo "✓ Python3 $(python3 --version)"
echo ""

# Install OpenClaw
echo "Installing OpenClaw..."
npm install -g openclaw
echo "✓ OpenClaw installed"
echo ""

# Install soco-cli
echo "Installing soco-cli (Sonos control)..."
pip3 install --user soco-cli
echo "✓ soco-cli installed"
echo ""

# Setup environment variables
echo "Checking environment variables..."
ZSHRC="$HOME/.zshrc"

if ! grep -q "OPENAI_API_KEY" "$ZSHRC" 2>/dev/null; then
  echo ""
  echo "⚠️  OPENAI_API_KEY not found in .zshrc"
  read -p "Enter your OpenAI API key (or press Enter to skip): " OPENAI_KEY
  if [ -n "$OPENAI_KEY" ]; then
    echo "" >> "$ZSHRC"
    echo "# OpenAI API Key" >> "$ZSHRC"
    echo "export OPENAI_API_KEY=\"$OPENAI_KEY\"" >> "$ZSHRC"
    echo "✓ Added OPENAI_API_KEY to .zshrc"
  fi
fi

if ! grep -q "BRAVE_API_KEY" "$ZSHRC" 2>/dev/null; then
  echo ""
  echo "⚠️  BRAVE_API_KEY not found in .zshrc"
  read -p "Enter your Brave Search API key (or press Enter to skip): " BRAVE_KEY
  if [ -n "$BRAVE_KEY" ]; then
    echo "" >> "$ZSHRC"
    echo "# Brave Search API Key" >> "$ZSHRC"
    echo "export BRAVE_API_KEY=\"$BRAVE_KEY\"" >> "$ZSHRC"
    echo "✓ Added BRAVE_API_KEY to .zshrc"
  fi
fi

if ! grep -q "Python/3.9/bin" "$ZSHRC" 2>/dev/null; then
  echo "" >> "$ZSHRC"
  echo "# Python user bin (sonos, etc)" >> "$ZSHRC"
  echo 'export PATH="$PATH:$HOME/Library/Python/3.9/bin"' >> "$ZSHRC"
  echo "✓ Added Python bin to PATH"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Run: source ~/.zshrc"
echo "2. Run: openclaw onboard"
echo "3. Copy workspace files from backup to ~/.openclaw/workspace/"
echo "4. Run: sonos-discover (to find Sonos speakers)"
echo ""
echo "See SETUP.md for full documentation."
