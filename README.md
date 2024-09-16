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