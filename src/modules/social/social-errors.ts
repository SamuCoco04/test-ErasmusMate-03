export class SocialForbiddenError extends Error { constructor(message = 'Forbidden') { super(message); this.name = 'SocialForbiddenError'; } }
export class SocialNotFoundError extends Error { constructor(message = 'Not found') { super(message); this.name = 'SocialNotFoundError'; } }
export class SocialValidationError extends Error { constructor(message = 'Validation failed') { super(message); this.name = 'SocialValidationError'; } }
export class SocialInvalidTransitionError extends Error { constructor(message = 'Invalid transition') { super(message); this.name = 'SocialInvalidTransitionError'; } }
export class SocialDuplicateError extends Error { constructor(message = 'Duplicate connection') { super(message); this.name = 'SocialDuplicateError'; } }
