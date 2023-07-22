# Lösungsvorschlag: Persönlicher Assistent zur Vorbereitung auf Klassenarbeiten

Lösungsvorschlag zu https://github.com/ahewer/exam-preparation-assistant

## Starten

- API Key für OpenAI in [docker-compose.yml](./docker-compose.yaml) eintragen:
```yaml
version: "3.8"
services:
  ui:
    image: exam-preparation-assistant-ui:latest
    ports:
      - "8001:80"
    restart: unless-stopped

  api:
    image: exam-preparation-assistant-service:latest
    ports:
      - "8000:80"
    environment:
      # Hier Key eintragen
      - OPENAI_API_KEY=?
    restart: unless-stopped
``` 
- `gradlew start` ausführen
- Anwendung ist danach auf http://localhost:8001/ verfügbar
