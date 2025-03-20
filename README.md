# Akıllı Sensör Takip Sistemi

Bu proje, IoT sensörlerinden gelen verileri gerçek zamanlı olarak toplayan, analiz eden ve görselleştiren bir sistemdir.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**
  - JWT tabanlı kimlik doğrulama
  - Rol tabanlı yetkilendirme (System Admin, Company Admin, User)
  - Güvenli şifre yönetimi

- **Şirket Yönetimi**
  - Şirket oluşturma, düzenleme, silme
  - Şirket bazlı kullanıcı yönetimi
  - Şirket bazlı veri izolasyonu

- **Sensör Veri Yönetimi**
  - MQTT protokolü ile gerçek zamanlı veri toplama
  - PostgreSQL'de metadata saklama
  - InfluxDB'de zaman serisi verilerini saklama
  - WebSocket ile gerçek zamanlı veri akışı

- **Güvenlik**
  - JWT authentication
  - Rate limiting
  - MQTT TLS/SSL desteği
  - API Key desteği

- **Loglama ve İzleme**
  - Winston ile yapılandırılmış JSON loglama
  - Kullanıcı davranış takibi
  - Sistem logları
  - Performans metrikleri

## 🛠 Teknoloji Yığını

- **Backend**: NestJS
- **Veritabanları**: 
  - PostgreSQL (metadata)
  - InfluxDB (zaman serisi verileri)
- **Mesajlaşma**: MQTT
- **API Dokümantasyonu**: Swagger/OpenAPI
- **Loglama**: Winston
- **Test**: Jest, Pactum
- **Rate Limiting**: @nestjs/throttler

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- PostgreSQL
- InfluxDB
- MQTT Broker (örn. Mosquitto)
- Docker (opsiyonel)

## 🔧 Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/mehmetalitilgen/smart-sensor-tracking-system.git
cd smart-sensor-tracking-system
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smart_sensor_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"

# MQTT
MQTT_URL="mqtt://localhost:8883"
MQTT_USERNAME="admin"
MQTT_PASSWORD="admin123"

# InfluxDB
INFLUXDB_URL="http://localhost:8086"
INFLUXDB_TOKEN="your-token"
INFLUXDB_ORG="your-org"
INFLUXDB_BUCKET="sensor_data"
```

4. Veritabanlarını hazırlayın:
```bash
# PostgreSQL migration
npx prisma migrate dev

# InfluxDB bucket oluşturma
influx bucket create -n sensor_data -o your-org -r 0
```

5. Uygulamayı başlatın:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🧪 Test

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 API Dokümantasyonu

Swagger UI'a `http://localhost:3333/api` adresinden erişebilirsiniz.

## 🔒 Güvenlik

- Tüm API endpoint'leri JWT ile korunmaktadır
- Rate limiting aktif (10 istek/dakika)
- MQTT bağlantıları TLS/SSL ile şifrelenir
- Hassas veriler environment variables ile yönetilir

## 📊 Veri Akışı

1. Sensörler MQTT üzerinden veri gönderir
2. Veriler MQTT broker üzerinden alınır
3. Metadata PostgreSQL'e kaydedilir
4. Zaman serisi verileri InfluxDB'ye kaydedilir
5. WebSocket üzerinden gerçek zamanlı veri akışı sağlanır

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 İletişim

Proje Sahibi - [@mehmetalitilgen](https://github.com/yourusername)

Proje Linki: [https://github.com/mehmetalitilgen/smart-sensor-tracking-system](https://github.com/yourusername/smart-sensor-tracking-system)

## 🐳 Docker ile Kurulum

### Docker Compose ile Tüm Servisleri Başlatma

1. Docker Compose dosyasını kullanarak tüm servisleri başlatın:
```bash
docker-compose up -d
```

Bu komut aşağıdaki servisleri başlatacaktır:
- NestJS API (port: 3333)
- PostgreSQL (port: 5432)
- InfluxDB (port: 8086)
- MQTT Broker (port: 1883, 8883)
- pgAdmin (port: 5050)

### Docker Compose Servisleri

```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3333:3333"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/smart_sensor_db
      - JWT_SECRET=your-secret-key
      - JWT_EXPIRES_IN=1d
      - MQTT_URL=mqtt://mosquitto:1883
      - MQTT_USERNAME=admin
      - MQTT_PASSWORD=admin123
      - INFLUXDB_URL=http://influxdb:8086
      - INFLUXDB_TOKEN=your-token
      - INFLUXDB_ORG=your-org
      - INFLUXDB_BUCKET=sensor_data
    depends_on:
      - postgres
      - influxdb
      - mosquitto

  postgres:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=smart_sensor_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  influxdb:
    image: influxdb:2.7
    ports:
      - "8086:8086"
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=admin123
      - DOCKER_INFLUXDB_INIT_ORG=your-org
      - DOCKER_INFLUXDB_INIT_BUCKET=sensor_data
      - DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=your-token
    volumes:
      - influxdb_data:/var/lib/influxdb2

  mosquitto:
    image: eclipse-mosquitto:2.0
    ports:
      - "1883:1883"
      - "8883:8883"
    volumes:
      - mosquitto_data:/mosquitto/data
      - mosquitto_log:/mosquitto/log
      - ./mosquitto/config:/mosquitto/config

  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=admin
    depends_on:
      - postgres

volumes:
  postgres_data:
  influxdb_data:
  mosquitto_data:
  mosquitto_log:
```

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
```

### Docker Komutları

```bash
# Tüm servisleri başlat
docker-compose up -d

# Servisleri durdur
docker-compose down

# Logları görüntüle
docker-compose logs -f

# Belirli bir servisin loglarını görüntüle
docker-compose logs -f api

# Servisleri yeniden başlat
docker-compose restart

# Servisleri ve volumeleri temizle
docker-compose down -v
```

### Veritabanı Yönetimi

1. PostgreSQL'e pgAdmin üzerinden erişim:
   - URL: http://localhost:5050
   - Email: admin@admin.com
   - Password: admin
   - Server bağlantı bilgileri:
     - Host: postgres
     - Port: 5432
     - Database: smart_sensor_db
     - Username: postgres
     - Password: postgres

2. InfluxDB yönetimi:
   - URL: http://localhost:8086
   - Token: your-token
   - Organization: your-org
   - Bucket: sensor_data

### MQTT Test

```bash
# MQTT mesajı yayınla
mosquitto_pub -h localhost -p 1883 -t "test/topic" -m "Hello MQTT"

# MQTT mesajlarını dinle
mosquitto_sub -h localhost -p 1883 -t "test/topic"

# TLS bağlantısı ile mesaj yayınla
mosquitto_pub --cafile ca.crt --cert client.crt --key client.key -h localhost -p 8883 -t "test/topic" -m "Hello Secure MQTT"

# TLS bağlantısı ile mesaj dinle
mosquitto_sub --cafile ca.crt --cert client.crt --key client.key -h localhost -p 8883 -t "test/topic"

```

### Troubleshooting

1. Servislerin durumunu kontrol et:
```bash
docker-compose ps
```

2. Servis loglarını kontrol et:
```bash
docker-compose logs api
```

3. Veritabanı bağlantısını test et:
```bash
docker-compose exec postgres psql -U postgres -d smart_sensor_db
```

4. InfluxDB bağlantısını test et:
```bash
docker-compose exec influxdb influx ping
```

5. MQTT bağlantısını test et:
```bash
docker-compose exec mosquitto mosquitto_pub -t "test" -m "test"
```
