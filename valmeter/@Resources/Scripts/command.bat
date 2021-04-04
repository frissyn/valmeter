echo "Hello, World!"
echo "Running NPM Install and Starting RPC..."

start "NPM" %ComSpec% /D /E:ON /K "call npm.cmd install ^& call npm.cmd start"
