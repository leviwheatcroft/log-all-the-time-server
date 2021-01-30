db.createUser(
  {
    user: 'timelog',
    pwd: 'timelog',
    roles: [
      {
        role: 'readWrite',
        db: 'timelog'
      }
    ]
  }
)
