# patient-registration

## Setup .env

Please use the .env.example that you can find in the project, where you will just need to change the MAIL_USER and MAIL_PASS for you mail trap creds.

## How to run?

```bash
docker-compose up
```

## Example

### Create patients

POST `/api/patients`

```json
{
  "name": "nombre apellido",
  "email": "nombre.apellido@example.com",
  "phone": "1234567890",
  "address": "123 Calle Principal",
  "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+L+U4T8ABu8CpCYJ1DQAAAAASUVORK5CYII="
}
```

### Obtener pacientes

GET `/api/patients`
