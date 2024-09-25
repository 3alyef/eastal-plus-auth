class Global {
  private userIds: string[];
  constructor() {
    this.userIds = [];
  }

  public getUserIds(): string[] {
    return this.userIds;
  }

  public setUserIds(updater: (prev: string[]) => string[]) {
    this.userIds = updater(this.userIds);
  }
}

const globalsVar = new Global();

export default globalsVar;
