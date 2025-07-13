**LLM CODE-GENERATION PROMPT
(Generate *Angular 20* Http Resource services from an OpenAPI 3.x JSON)**

---

### 0️⃣ Goal

> You are an **Angular 20** engineer.
> Given a single **OpenAPI 3.x JSON** file, produce fully-typed **Angular Http services** that wrap every REST endpoint.
> **One logical endpoint group → one service class**.

---

### 1️⃣ Input

* **File**: `openapi.json` (full text appears in §6 at run time).
* The spec uses `tags` to group operations; fall back to the first path segment if a tag is missing.

---

### 2️⃣ Output – what to generate

For **each tag / group** found in the spec:

| File               | Location             | Contents                                                              |
| ------------------ | -------------------- | --------------------------------------------------------------------- |
| `<tag>.models.ts`  | `src/app/api/<tag>/` | `export interface` types for every schema used by that tag            |
| `<tag>.service.ts` | `src/app/api/<tag>/` | Injectable Angular 20 service that calls all operations with that tag |

---

#### Service implementation rules

1. **Class name** `<Tag>ApiService` (`AccountsApiService`, `PatientsApiService`, …).
2. Inject **`HttpClient`** and **`API_BASE_URL`** (`InjectionToken<string>` exported from `core/api-base-url.ts`).
3. **Public method per operation**

  * Name: camel-cased `operationId`; fallback to `<method><Path>` if missing.
  * Signature uses **strongly-typed `@angular/common/http`** (`HttpParams`, `HttpHeaders`, etc.).
  * Return type = `Observable<XXX>`, where `XXX` is the response schema or `void`.
  * Build URL with template-literal interpolation for path params and `HttpParams` for query params.
4. **RxJS**

  * End each request with `.pipe(catchError(this.handleError))`.
  * Provide a private `handleError(error: HttpErrorResponse): Observable<never>` that re-throws after logging.
5. **Docs**

  * Add JSDoc `/** … */` above each method with `@summary`, `@param`, `@returns`.
6. **Strict mode** (`"strict": true` in tsconfig). No `any` or `unknown` unless unavoidable.
7. **No framework extras** – don’t add NgRx, interceptors, guards, etc. beyond the `API_BASE_URL` token.

---

### 3️⃣ Shared helpers to create once

* `core/api-base-url.ts`

  ```ts
  import { InjectionToken } from '@angular/core';
  export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
  ```
* `core/date-util.ts` – ISO ⇆ `Date` helpers if the spec contains `format: date-time`.
* Optional: `core/pagination.ts` when the spec uses `page`, `size`, `total`.

---

### 4️⃣ Output format

Produce code blocks only – **one file per block**:

```ts
// path/to/file.ts
/* file content */
```

*No explanatory prose inside code blocks.*
Order: shared helpers → tag folders alphabetically → services inside each folder → models.

---

### 5️⃣ Quality checklist (self-eval)

* Services compile with **Angular 20**, `@angular/common/http`, `rxjs@8`, TypeScript 5.x strict mode.
* All path, query, header, and body parameters are mapped and typed.
* No duplicated model interfaces; reuse imports across services.
* Base URL injectable; services free of hard-coded host names.
* Observable error handling centralised.
* Each group’s public API surface mirrors the OpenAPI **operationIds**.

---

### 6️⃣ OpenAPI specification (inserted at run-time)

```json
{ /* … full openapi.json … */ }
```

---

**➡️ Generate the complete Angular 20 Http Resource layer now.**
