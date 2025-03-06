export class PermissionValidator {
  static hasPermission(member, permission) {
    return member.permissions.has(permission);
  }

  static validateGuildPermissions(guild, requiredPermissions) {
    return requiredPermissions.every(permission => 
      guild.me.permissions.has(permission)
    );
  }
}