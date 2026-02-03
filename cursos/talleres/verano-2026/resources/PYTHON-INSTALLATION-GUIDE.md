# Python Installation Guide
## Talleres de Verano FP-UNA 2026

**Required for Classes 3 (Software), 4 (Electronics), and 5 (Aeronautics).**

---

## 🪟 Windows

1.  **Download**: Go to [python.org/downloads](https://www.python.org/downloads/)
2.  **Click**: "Download Python 3.x.x" (latest version)
3.  **Run Installer**: Double-click the downloaded file.
4.  **⚠️ IMPORTANT**: Check the box **"Add Python to PATH"** at the bottom of the first screen.
    *   *If you miss this, you won't be able to run python from the terminal.*
5.  **Click**: "Install Now"
6.  **Verify**:
    *   Open "Command Prompt" (Win+R, type `cmd`, Enter)
    *   Type `python --version`
    *   You should see `Python 3.x.x`

## 🍎 macOS

1.  **Download**: Go to [python.org/downloads](https://www.python.org/downloads/)
2.  **Click**: "Download Python 3.x.x"
3.  **Run Installer**: Open the `.pkg` file and follow instructions.
4.  **Verify**:
    *   Open "Terminal" (Cmd+Space, type `Terminal`, Enter)
    *   Type `python3 --version`
    *   You should see `Python 3.x.x`
    *   *Note: On Mac, you usually use `python3` instead of `python`.*

## 🐧 Linux (Ubuntu/Debian)

Python is usually pre-installed. To ensure you have the latest:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

**Verify**:
```bash
python3 --version
```

---

## 📦 Installing Libraries (pandas, numpy, etc.)

For Class 5 (Aeronautics), you need specific data science libraries.

**Windows**:
```bash
pip install pandas numpy matplotlib scipy
```

**macOS / Linux**:
```bash
pip3 install pandas numpy matplotlib scipy
```

---

## 🧪 Test Your Environment

1.  Open your terminal/command prompt.
2.  Type `python` (or `python3`) to enter the interactive shell.
3.  Type `import pandas` and press Enter.
4.  If no error appears, you are ready!
5.  Type `exit()` to close.
