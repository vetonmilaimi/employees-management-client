// General helpers service using OOP style

class GeneralHelpersService {
  /**
   * Removes all keys with null values from an object.
   * @param obj The object to clean.
   */
  cleanNulls<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== null)
    ) as Partial<T>;
  }
}

const generalHelpersService = new GeneralHelpersService();
export default generalHelpersService;
