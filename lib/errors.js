//! COMMON ERRORS

export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}

export class AlreadyExists extends Error {
  constructor() {
    super()
    this.name = 'AlreadyExists'
  }
}

export class Unauthorized extends Error {
  constructor() {
    super()

    this.name = 'Unauthorized'
  }
}
export class OnlyAdmins extends Error {
  constructor() {
    super()

    this.name = 'OnlyAdmins'
  }
}

//! USER ERRORS

export class UsernameExists extends Error {
  constructor() {
    super()
    this.name = 'UsernameExists'
  }
}
export class EmailExists extends Error {
  constructor() {
    super()
    this.name = 'EmailExists'
  }
}
export class PasswordsNotMatching extends Error {
  constructor() {
    super()
    this.name = 'PasswordsNotMatching'
  }
}
export class UserInfoMissing extends Error {
  constructor() {
    super()
    this.name = 'UserInfoMissing'
  }
}
