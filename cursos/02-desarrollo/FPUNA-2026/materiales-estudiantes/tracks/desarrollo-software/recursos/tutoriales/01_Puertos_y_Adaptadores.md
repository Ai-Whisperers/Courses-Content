# 🏗️ Tutorial Deep-Dive: Puertos y Adaptadores (Ports & Adaptadores)

## Implementación Técnica para Lead Architects

En este tutorial, pasaremos de la teoría a la implementación exacta. Olvida el dibujo del hexágono; lo que importa es el flujo de dependencias.

---

### 1. El Flujo de Dependencia Invertido

La regla fundamental: **Nada en el Dominio debe conocer nada de la Infraestructura.**

- **INCORRECTO**: El Dominio importa a `PrismaClient` para guardar datos.
- **CORRECTO**: El Dominio define una **Interfaz (Puerto)** y la Infraestructura la **Implementa (Adaptador)**.

### 2. Estructura de Archivos Recomendada (IA-Friendly)

```text
src/
├── domain/                # El Corazón (Soberanía)
│   ├── entities/          # Clases puras (ej: Alumno.ts)
│   └── ports/             # Interfaces (ej: IUserRepository.ts)
├── application/           # La Inteligencia (Casos de uso)
│   └── services/          # Orquestadores (ej: RegisterStudent.ts)
└── infrastructure/        # El Detalle (Códigos sucios)
    ├── controllers/       # Adaptadores de Entrada (HTTP/REST)
    └── repositories/      # Adaptadores de Salida (SQL/NoSQL)
```

### 3. Implementando un Puerto (El Enchufe)

Un puerto es simplemente un contrato. No le importa cómo se guardan los datos, solo qué datos se guardan.

```typescript
// src/domain/ports/IUserRepository.ts
export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
```

### 4. Implementando un Adaptador (El Conector)

El adaptador es código técnico pesado. Aquí es donde usas ORMs, APIs externas, etc.

```typescript
// src/infrastructure/repositories/PrismaUserRepository.ts
import { IUserRepository } from "../../domain/ports/IUserRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async save(user: User): Promise<void> {
    await this.prisma.user.create({ data: user.toObject() });
  }
  // ...
}
```

### 5. Inyección de Dependencias (El Ensamble)

Como Lead Architect, delegas a la IA que ensamble las piezas en el nivel más alto (ej: `main.ts`).

```typescript
// El sistema no sabe que usa Prisma, solo sabe que usa un IUserRepository
const userRepository = new PrismaUserRepository();
const registerService = new RegisterStudentService(userRepository);
```

---

## 🤖 Reto de Delegación

Pide a OpenCode que convierta un servicio que ya tengas escrito en capas tradicionales a este modelo. Notarás que la IA se vuelve más precisa al tener responsabilidades tan separadas.

> **Prompt de Reto**: "Analiza mi servicio actual y sepáralo en tres carpetas: `domain/ports`, `application/use-cases` e `infrastructure/adapters`. Asegúrate de que los archivos de `domain` no tengan ni un solo import de librerías externas."

---

## 📺 Referencias de Élite

- **Alistair Cockburn Original Post**: [The Creator's Vision](https://alistair.cockburn.us/hexagonal-architecture/)
- **Clean Architecture (Uncle Bob)**: [Evolution of Ports & Adapters](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
