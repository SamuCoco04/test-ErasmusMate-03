export class SocialForbiddenError extends Error { constructor(message = 'Forbidden') { super(message); this.name = 'SocialForbiddenError'; } }
export class SocialNotFoundError extends Error { constructor(message = 'Not found') { super(message); this.name = 'SocialNotFoundError'; } }
