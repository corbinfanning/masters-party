# Real-Time Voice Conversation Mode Research
*February 9, 2026 | Scout*

## Current State
Corbin currently has voice messaging via Telegram with 15-30s latency (voice → transcribe → Claude → TTS → send). Goal: achieve sub-2s round-trip for real-time conversation like ChatGPT voice mode.

## What Exists Already

### Native Solutions
- **Claude Voice Mode** (Anthropic, May 2025): Native voice capabilities with neural TTS and minimal latency, but only available in Claude mobile apps
- **OpenAI Realtime API** (Oct 2024): WebRTC-based, <2s latency, but locked to GPT models, not Claude
- **Gemini Live**: Google's real-time voice solution, also model-locked

### Third-Party Integrations  
- **LiveKit Agents**: Open-source framework with official Claude integration plugin, production-ready WebRTC infrastructure
- **Picovoice + Claude**: Custom Python implementation achieving lower latency than Claude Voice Mode through local speech processing  
- **Twilio Voice + Claude**: Phone-based integration using ConversationRelay, <100 lines of code
- **Hume AI + Claude**: Emotionally intelligent voice interactions, 10% latency reduction through prompt caching

## Technical Approaches

### 1. Traditional Pipeline (STT → LLM → TTS)
**Pros**: Model flexibility, mature ecosystem, controllable costs
**Cons**: Higher latency (~3-5s), complex orchestration  
**Tools**: RealtimeSTT + Claude API + RealtimeTTS/ElevenLabs

### 2. Streaming WebRTC Pipeline  
**Pros**: Lower latency (~1-2s), web browser compatible, real-time audio processing
**Cons**: Complex setup, requires WebRTC expertise
**Tools**: LiveKit Agents, FastRTC, custom WebSocket streaming

### 3. Anthropic Native (Future)
**Pros**: Purpose-built for Claude, likely lowest latency, official support
**Cons**: Currently mobile-only, no API access announced
**Status**: Monitor for developer API release

## Cost Analysis

**Per-minute estimates** (based on 2025 pricing):
- **Traditional Pipeline**: $0.05-0.15 (STT: $0.024/min + Claude: $0.03/1K tokens + TTS: $0.015/1K chars)
- **OpenAI Realtime**: $0.24/min input + $0.96/min output (expensive for long conversations)
- **LiveKit self-hosted**: Infrastructure costs only (~$0.01-0.05/min depending on usage)

**Key insight**: Real-time APIs cost 3-10x more due to continuous audio processing and context accumulation.

## Simplest MVP Approach

**Recommended**: LiveKit Agents + Claude integration
```python
# Core architecture (simplified)
livekit-agents \
  --stt deepgram \           # Fast, accurate STT  
  --llm anthropic/claude \   # Official plugin exists
  --tts elevenlabs \         # Low-latency streaming TTS
  --transport webrtc         # Real-time audio transport
```

**Why this approach**:
- ✅ Official Claude plugin available
- ✅ Production-ready WebRTC infrastructure  
- ✅ Mix-and-match STT/TTS providers
- ✅ Self-hostable (no vendor lock-in)
- ✅ Active development, strong community
- ✅ Can achieve ~1-2s latency

**Alternative**: Direct integration using RealtimeSTT + Claude API + RealtimeTTS if simpler deployment needed.

## Open Questions

1. **Anthropic roadmap**: When will Claude get an official real-time voice API? (Monitor anthropic.com/api)
2. **Quality vs. latency tradeoff**: How much latency is acceptable? (<2s target, but <5s might be sufficient)
3. **Infrastructure**: Self-host vs. cloud? WebRTC requires TURN servers for NAT traversal  
4. **Integration point**: Telegram bot vs. web app vs. native app vs. phone integration?
5. **Wake word**: Always-listening vs. push-to-talk vs. keyword activation?

## Next Steps

1. **Prototype Phase**: Build LiveKit Agents demo with Claude integration (~1-2 days)
2. **Test latency**: Measure actual round-trip times in realistic network conditions
3. **Integration**: Determine how to connect to existing Telegram/OpenClaw workflow
4. **Monitor Anthropic**: Watch for official real-time API announcements

**Timeline estimate**: Working prototype in 1-2 weeks, production-ready in 1 month.

**Risk**: Anthropic could announce official real-time API, making custom solution obsolete. Monitor closely.