/**
 * Decorator that logs the method name, arguments, return value, and execution time of a method.
 * @param target - The target object.
 * @param propertyName - The name of the property (method) being decorated.
 * @param descriptor - The property descriptor of the method being decorated.
 * @returns The modified property descriptor.
 */
export function printLog(
  target: Object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any) {
    console.log(`-- ${propertyName}() called with arguments: `, args);
    const start = performance.now();
    let result: any;
    try {
      result = originalMethod.apply(this, args);
      console.log(`-- ${propertyName}() returned: `, result);
    } catch (error) {
      console.error(`-- ${propertyName}() encountered an error: `, error);
    }
    const end = performance.now();
    console.log(`-- ${propertyName}() execution time: `, end - start);
    return result;
  };
  return descriptor;
}
