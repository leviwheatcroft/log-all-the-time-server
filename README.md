
## graphql playground example

```
mutation UserRegisterM($password: String!, $email: String!) {
  UserRegisterM(password: $password, email: $email)
}
```

Query Vars:
```
{
  "password": "foo",
  "email": "email@address.com"
}

```
