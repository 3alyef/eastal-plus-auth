# Alpostel auth api

## Descrição

Api responsável pela autênticação e cadastro de usuário.

## Models

### UserIdModel

<h4>
Informações de usuário:
</h4>

<section>

```js
[
	{
		userId: "",
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		updatedAt: "",
	}
]
```
</section>

### AccountModel

<h4>
	Informações básicas sobre a conta do usuário:
</h4>

<section>

```js
[
	{
		userId: "",
		email: "",
		password: "",
		createdIn: "",
		accountType: "",
		updatedAt: "",
		recoveryEmail: ""
	}
]

// accountType: "default: normal" => normal | pro | admin
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
