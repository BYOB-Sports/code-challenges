#!/usr/bin/env python3
import webbrowser

# Fork the BYOB-Sports repository
fork_url = "https://github.com/BYOB-Sports/code-challenges/fork"

print("🚀 Opening GitHub to fork the BYOB-Sports repository...")
print("This will open the fork page in your browser.")
print("\nSteps to complete:")
print("1. Click 'Create fork' on the page that opens")
print("2. Wait for the fork to be created")
print("3. Copy the URL of your forked repository")
print("4. We'll then set up the pull request")

# Open the fork page
webbrowser.open(fork_url)
