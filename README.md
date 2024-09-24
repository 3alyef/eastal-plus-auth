# Alpostel auth api

## Descrição

Api responsável pela autênticação e cadastro de usuário.

## Models

### Users

<h4>
Esta collection armazena informações sobre os usuários, como seu email, nome, hash da senha e dados de autenticação.
</h4>

<section>

```js
[
	{
		"_id": ObjectId("..."),  
		"email": "user@example.com", 
		"password_hash": "",  // Hash da senha (bcrypt, argon2, etc.)
		"first_name": "User Name", 
		"last_name": "",
		"created_at": ISODate("2024-09-24T12:00:00Z"),
		"last_login": ISODate("2024-09-24T12:00:00Z"),
		"roles": ["user"],  // Papel do usuário no sistema (ex: 'admin', 'user')
		"status": "active",  // ('active' | 'inactive' | 'banned')
		"account_id": ObjectId("...") // referencia a collection Accounts
	},
]
```
</section>

### Accounts

<h4>
	Aqui ficam os dados relacionados à conta de um usuário, como seu ID de conta (usado para diferentes provedores de login, como OAuth).
</h4>

<section>

```js
[
	{
		"_id": ObjectId("..."),  // ID da conta
		"provider": "local",  // Provedor de autenticação (ex: 'local', 'google', 'facebook')
		"provider_id": "provider-specific-id",  // ID do provedor externo (se usar OAuth)
		"user_id": ObjectId("..."),  // Referência a collection Users
		"created_at": ISODate("2024-09-24T12:00:00Z"),  // Data de criação
		"is_verified": true  // Status de verificação de email
	},
]

// accountType: "default: normal" => normal | pro | admin
```
</section>

### Sessions

<h4>
Armazena informações sobre sessões de login ativas e tokens de autenticação. Usada para gerenciar tokens de sessão (como JWT) ou refresh tokens.
</h4>

<section>

```js
[
	{
		"_id": ObjectId("..."),
		"user_id": ObjectId("..."),  // Referência a collection Users
		"token": "token",  // Token JWT
		"refresh_token": "token",  // Token de refresh
		"expires_at": ISODate("2024-09-25T12:00:00Z"),  // Data de expiração
		"ip_address": "192.168.0.1",  // Endereço IP do usuário
		"user_agent": "Mozilla/5.0",  // Agente do navegador do usuário
		"created_at": ISODate("2024-09-24T12:00:00Z")  // Data de criação da sessão
	},
]
```
</section>

### PasswordResets

<h4> 
Armazena tokens de recuperação de senha, facilitando a redefinição de senhas por email.
</h4>

<section>

```js
[
	{
		"_id": ObjectId("..."),
		"user_id": ObjectId("..."),  // Referência a collection Users
		"reset_token": "token",  // Token único para reset de senha
		"expires_at": ISODate("2024-09-24T14:00:00Z"),  // Expiração do token
		"used": false,  // Indica se o token já foi usado
		"created_at": ISODate("2024-09-24T12:00:00Z")  // Data de criação
	},
]
```
</section>

### AuditLogs

<h4>
Logs de atividades relacionadas à autenticação, como login, logout, tentativas de reset de senha, etc. Isso é útil para fins de segurança.
</h4>

<section>

```js
[
	{
		"_id": ObjectId("..."),
		"user_id": ObjectId("..."),  // Referência ao usuário
		"action": "login",  // Ação executada (ex: 'login', 'logout', 'reset_password')
		"ip_address": "192.168.0.1",  // Endereço IP
		"user_agent": "Mozilla/5.0",  // Agente do navegador
		"timestamp": ISODate("2024-09-24T12:00:00Z"),  // Data e hora do evento
		"status": "success"  // Resultado da ação ('success', 'failed')
	},
]
```
</section>

<h3>.env keys:</h3>
<div>

DB_URL=""
M2_URL=""
CLIENT_WB_URL=""
TOKEN_KEY=""
UNREGISTER_KEY=""

</div>
