# 🔑 MiniMax API Configuration - Complete Reference

## 📋 API Configuration Summary

**Base URL**: `https://api.minimax.io/v1`
**Provider**: `openai` (OpenAI-compatible API)
**Total Models**: 3 (M2.1, M2.5, M2.7)

---

## 🤖 Model 1: MiniMax-M2.1

```json
{
  "title": "MiniMax-M2.1",
  "provider": "openai",
  "model": "MiniMax-M2.1",
  "apiKey": "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s",
  "apiBase": "https://api.minimax.io/v1"
}
```

**Details**:

- **Model Name**: `MiniMax-M2.1`
- **Display Title**: `MiniMax-M2.1`
- **API Key**: `sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s`

---

## 🤖 Model 2: MiniMax-M2.5

```json
{
  "title": "MiniMax-M2.5",
  "provider": "openai",
  "model": "MiniMax-M2.5",
  "apiKey": "sk-cp-LQZQu5UhSNim758bUdPOfN00m-VQ_nNpkrQ-HDMrXdyeD7y2YHqLwVVEatjXprMP4pgyWsbmr5AKMfjh3Lsp_-CeYBeUloTQ4KCDK30kifrd_4und1JuIMEa",
  "apiBase": "https://api.minimax.io/v1"
}
```

**Details**:

- **Model Name**: `MiniMax-M2.5`
- **Display Title**: `MiniMax-M2.5`
- **API Key**: `sk-cp-LQZQu5UhSNim758bUdPOfN00m-VQ_nNpkrQ-HDMrXdyeD7y2YHqLwVVEatjXprMP4pgyWsbmr5AKMfjh3Lsp_-CeYBeUloTQ4KCDK30kifrd_4und1JuIMEa`

---

## 🤖 Model 3: MiniMax-M2.7

```json
{
  "title": "MiniMax-M2.7",
  "provider": "openai",
  "model": "MiniMax-M2.7",
  "apiKey": "sk-cp-2WFpfcnusIFZRHGW_4ucJpXcrPX9toLBrJPTX7ULeRXItFt6IDhEgHBzq64Nr95fTx2PfTAvd26-BzlwvGU_78fQhs0gW2DrvVgCeZ6GVeFBVSDKbDBsh",
  "apiBase": "https://api.minimax.io/v1"
}
```

**Details**:

- **Model Name**: `MiniMax-M2.7`
- **Display Title**: `MiniMax-M2.7`
- **API Key**: `sk-cp-2WFpfcnusIFZRHGW_4ucJpXcrPX9toLBrJPTX7ULeRXItFt6IDhEgHBzq64Nr95fTx2PfTAvd26-BzlwvGU_78fQhs0gW2DrvVgCeZ6GVeFBVSDKbDBsh`

---

## 📄 Complete Configuration File

**Location**: `~/.continue/config.json`

```json
{
  "models": [
    {
      "title": "MiniMax-M2.1",
      "provider": "openai",
      "model": "MiniMax-M2.1",
      "apiKey": "sk-cp-QSosnmZwolJUFe--cpiaMcbZ40Xs1-Pmxo6on0IoRoT-vYdlRK-zhTdbLWYAkQifcRGaRi29GW2Ef0nlfUjSCtIHGjWtb4nFy-8hZ5Xh0ny5Jd5salibd_s",
      "apiBase": "https://api.minimax.io/v1"
    },
    {
      "title": "MiniMax-M2.5",
      "provider": "openai",
      "model": "MiniMax-M2.5",
      "apiKey": "sk-cp-LQZQu5UhSNim758bUdPOfN00m-VQ_nNpkrQ-HDMrXdyeD7y2YHqLwVVEatjXprMP4pgyWsbmr5AKMfjh3Lsp_-CeYBeUloTQ4KCDK30kifrd_4und1JuIMEa",
      "apiBase": "https://api.minimax.io/v1"
    },
    {
      "title": "MiniMax-M2.7",
      "provider": "openai",
      "model": "MiniMax-M2.7",
      "apiKey": "sk-cp-2WFpfcnusIFZRHGW_4ucJpXcrPX9toLBrJPTX7ULeRXItFt6IDhEgHBzq64Nr95fTx2PfTAvd26-BzlwvGU_78fQhs0gW2DrvVgCeZ6GVeFBVSDKbDBsh",
      "apiBase": "https://api.minimax.io/v1"
    }
  ]
}
```

---

## 🔧 Quick Reference

### **Common Settings**:

- **API Base URL**: `https://api.minimax.io/v1`
- **Provider Type**: `openai`
- **Authentication**: API Key based
- **Configuration File**: `~/.continue/config.json`

### **Model Names**:

1. `MiniMax-M2.1`
2. `MiniMax-M2.5`
3. `MiniMax-M2.7`

### **API Key Format**:

All keys start with `sk-cp-` followed by a long alphanumeric string.

---

## 🚀 Usage in Extension

When the Wasp Code extension is working, these models will appear in:

- Model selection dropdown
- Chat interface
- Code completion features
- All AI-powered functionality

The extension automatically reads from `~/.continue/config.json` and makes these models available for use.

---

## 🔒 Security Note

**Important**: These API keys are sensitive credentials. Keep them secure and don't share them publicly. They provide access to your MiniMax API account and usage will be billed to your account.

---

## ✅ Configuration Status

- **File Location**: ✅ `~/.continue/config.json`
- **Models Configured**: ✅ 3 models (M2.1, M2.5, M2.7)
- **API Keys**: ✅ All provided and formatted correctly
- **Base URL**: ✅ Set to MiniMax API endpoint
- **Provider**: ✅ Set to OpenAI-compatible format

**Ready for use once webview issue is resolved!**
