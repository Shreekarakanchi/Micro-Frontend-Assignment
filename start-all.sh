#!/bin/bash

# Bash script to start all micro-frontends
# Run from micro-frontend root directory: ./start-all.sh

echo "🚀 Starting Micro-Frontend Applications..."
echo ""

# Function to start an app in a new terminal
start_app() {
    local app_name=$1
    local port=$2
    local color=$3
    
    echo -e "${color}Starting ${app_name} on port ${port}...${NC}"
    
    # For macOS, use Terminal.app
    if [[ "$OSTYPE" == "darwin"* ]]; then
        osascript -e "tell app \"Terminal\" to do script \"cd '$(pwd)/${app_name}' && npm start\""
    # For Linux with gnome-terminal
    elif command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "cd '$(pwd)/${app_name}' && npm start; exec bash"
    # For Linux with xterm
    elif command -v xterm &> /dev/null; then
        xterm -e "cd '$(pwd)/${app_name}' && npm start" &
    else
        # Fallback: run in background
        cd "${app_name}" && npm start &
        cd ..
    fi
}

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Start applications
start_app "chat" "3001" "$CYAN"
sleep 2

start_app "email" "3002" "$YELLOW"
sleep 2

start_app "host" "3000" "$MAGENTA"

echo ""
echo -e "${GREEN}✅ All applications are starting...${NC}"
echo ""
echo "📋 Application URLs:"
echo -e "   ${CYAN}Host:  http://localhost:3000${NC}"
echo -e "   ${YELLOW}Chat:  http://localhost:3001${NC}"
echo -e "   ${MAGENTA}Email: http://localhost:3002${NC}"
echo ""
echo -e "${YELLOW}⏳ Wait for all webpack compilations to complete...${NC}"
echo -e "${GREEN}🌐 Then open http://localhost:3000 in your browser${NC}"
