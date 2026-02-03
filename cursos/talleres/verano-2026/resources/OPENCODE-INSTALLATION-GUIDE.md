# OpenCode Installation Guide
## Talleres de Verano FP-UNA 2026

**Version**: 1.0  
**Last Updated**: January 23, 2026  
**Estimated Time**: 15-20 minutes

---

## 📋 Pre-Requirements

Before installing OpenCode, make sure you have:

- ✅ **Operating System**: 
  - Windows 10/11
  - macOS 10.15 or later
  - Linux (Ubuntu 20.04+, Fedora, etc.)

- ✅ **Internet Connection**: Stable connection required

- ✅ **Disk Space**: At least 500 MB free

- ✅ **Email**: Gmail or other email for creating accounts

---

## 🪟 Windows Installation

### Step 1: Download OpenCode

1. Go to https://www.opencode.ai/ in your browser
2. Click on **"Download"** button
3. Select **"Windows"**
4. Download will start automatically (file: `OpenCode-Setup.exe`)

### Step 2: Install

1. **Locate** the downloaded file (usually in `Downloads` folder)
2. **Double-click** `OpenCode-Setup.exe`
3. If Windows shows security warning:
   - Click **"More info"**
   - Click **"Run anyway"**
4. Follow installation wizard:
   - Click **"Next"**
   - Accept license agreement
   - Choose installation location (default is fine)
   - Click **"Install"**
5. Wait 2-3 minutes for installation
6. Click **"Finish"**

### Step 3: First Launch

1. **Launch OpenCode** from Desktop shortcut or Start Menu
2. **Sign in** or **Create Account**:
   - Option 1: Sign in with Google
   - Option 2: Create account with email
3. Follow on-screen instructions

---

## 🍎 macOS Installation

### Step 1: Download OpenCode

1. Go to https://www.opencode.ai/
2. Click **"Download"**
3. Select **"macOS"**
4. Download `OpenCode.dmg`

### Step 2: Install

1. **Open** the downloaded `.dmg` file
2. **Drag** OpenCode icon to Applications folder
3. **Eject** the OpenCode disk image

### Step 3: First Launch

1. **Open** Applications folder
2. **Find** OpenCode
3. **Right-click** → **"Open"** (first time only)
4. If macOS blocks it:
   - Go to **System Preferences** → **Security & Privacy**
   - Click **"Open Anyway"**
5. **Sign in** or **Create Account**

---

## 🐧 Linux Installation

### Step 1: Download OpenCode

1. Visit https://www.opencode.ai/
2. Click **"Download"**
3. Select **"Linux"**
4. Download `OpenCode.AppImage`

### Step 2: Make Executable

Open terminal and run:
```bash
cd ~/Downloads
chmod +x OpenCode.AppImage
```

### Step 3: Run

```bash
./OpenCode.AppImage
```

**Optional**: Move to `/opt` for permanent installation:
```bash
sudo mv OpenCode.AppImage /opt/
sudo ln -s /opt/OpenCode.AppImage /usr/local/bin/opencode
```

Now you can run with: `opencode`

---

## 🔑 Getting Your API Key

OpenCode uses Claude (Anthropic) as its AI backend. You need an API key.

### Option 1: Free Tier (Recommended for Workshop)

1. Go to https://console.anthropic.com/
2. Click **"Sign Up"**
3. Create account (use Google for speed)
4. Verify email if prompted
5. Go to **"API Keys"** section
6. Click **"Create Key"**
7. Name it: "OpenCode Workshop"
8. **Copy** the key (starts with `sk-ant-...`)
9. **Save** it somewhere safe (you won't see it again!)

**Free Tier Includes**:
- $5 free credit
- Enough for 2-3 days of workshop usage
- No credit card required initially

### Option 2: Paid Plan (If You Need More)

- Add credit card in Anthropic Console
- Starts at $5 minimum
- Pay as you go

---

## ⚙️ Configure OpenCode

### First Time Setup

1. **Launch OpenCode**
2. You'll see **"Welcome to OpenCode"** screen
3. Click **"Get Started"**
4. **Enter API Key**:
   - Paste your Anthropic API key
   - Click **"Verify"**
5. **Choose Model**:
   - Select **"Claude 3.5 Sonnet"** (recommended)
   - This is the best balance of speed and quality
6. **Set Preferences**:
   - Theme: Dark or Light (your choice)
   - Font Size: Medium (adjust if needed)
   - Auto-save: ON (recommended)
7. Click **"Finish Setup"**

---

## ✅ Test Your Installation

### Quick Test

1. In OpenCode, type:
```
Hello! Can you confirm you're working correctly? 
Please respond with "System operational ✅"
```

2. Press **Enter** or click **Send**

3. You should get response within 5-10 seconds

4. If you see response: **✅ Installation successful!**

### Test File Operations

1. Create a test folder on your Desktop: `opencode-test`
2. In OpenCode, click **"Open Folder"**
3. Select the `opencode-test` folder
4. Type:
```
Create a file called hello.txt with the text "Hello from OpenCode!"
```
5. OpenCode should create the file
6. Check your folder - file should exist

**✅ If file was created: Perfect! You're ready.**

---

## 🚨 Troubleshooting

### Problem 1: "API Key Invalid"

**Solution**:
1. Go back to https://console.anthropic.com/
2. Check if API key was copied correctly (no extra spaces)
3. Try creating a new API key
4. Make sure you have available credits

### Problem 2: "OpenCode Won't Install" (Windows)

**Solution**:
1. Run as Administrator:
   - Right-click installer
   - "Run as administrator"
2. Disable antivirus temporarily
3. Try downloading again (file might be corrupted)

### Problem 3: "OpenCode Won't Open" (macOS)

**Solution**:
1. Go to System Preferences → Security & Privacy
2. Click "Open Anyway"
3. If still blocked, run in terminal:
```bash
xattr -cr /Applications/OpenCode.app
```

### Problem 4: "Connection Error"

**Solution**:
1. Check your internet connection
2. Try disabling VPN if you're using one
3. Check firewall settings (allow OpenCode)
4. Restart OpenCode

### Problem 5: "Out of Credits"

**Solution**:
1. Go to https://console.anthropic.com/
2. Check "Usage" section
3. Add more credits if needed
4. Or wait until credits reset (if on free tier)

---

## 💡 Tips for Workshop

### Conserve API Credits

- Don't send overly long prompts unnecessarily
- One detailed prompt is better than 10 vague ones
- Close OpenCode when not using it

### Best Practices

- **Save important conversations**: Export before closing
- **Name your folders**: Use descriptive names
- **Keep API key safe**: Don't share it publicly

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Send message |
| `Ctrl/Cmd + N` | New conversation |
| `Ctrl/Cmd + O` | Open folder |
| `Ctrl/Cmd + ,` | Settings |
| `Ctrl/Cmd + K` | Clear conversation |

---

## 📞 Need Help?

### During Workshop

- **Ask instructor** during class
- **Use chat** to ask questions
- **Help each other** in breakout rooms

### After Workshop

- **Email**: talleres-verano@fpuna.edu.py
- **WhatsApp Group**: [Will be shared in class]
- **OpenCode Docs**: https://www.opencode.ai/docs

---

## 📚 Additional Resources

### Official Documentation
- OpenCode Docs: https://www.opencode.ai/docs
- Anthropic Claude Docs: https://docs.anthropic.com/
- Video Tutorial: [YouTube link]

### Community
- OpenCode Discord: [Link]
- Reddit: r/ClaudeAI

---

## ✅ Installation Checklist

Before Class 1, make sure you have:

- [ ] OpenCode installed and launches
- [ ] Anthropic account created
- [ ] API key obtained and added to OpenCode
- [ ] Test conversation successful
- [ ] File operations working

**If all checked: You're ready! See you in class!** 🚀

---

## 🎯 What's Next?

After installation:
1. **Explore** OpenCode interface
2. **Try** a few simple prompts
3. **Watch** the intro video (link in welcome email)
4. **Join** the workshop WhatsApp group

**Don't worry if you get stuck** - we'll help you in the first 15 minutes of Class 1!

---

_Created for: Talleres de Verano FP-UNA 2026_  
_Questions? talleres-verano@fpuna.edu.py_
