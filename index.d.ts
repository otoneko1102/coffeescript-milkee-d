// These interfaces describe the nested parts of the configuration.
// They don't need to be exported themselves.

/**
 * (Optional) Additional options for the CoffeeScript compiler.
 * See `coffee --help` for all available options.
 * Web: https://coffeescript.org/annotated-source/command.html
 */
interface CoffeeOptions {
  /**
   * The following options are supported:
   */
  bare?: boolean;
  join?: boolean;
  map?: boolean;
  inlineMap?: boolean;
  noHeader?: boolean;
  transpile?: boolean;
  literate?: boolean;
  watch?: boolean;
}

/**
 * Describes the compilation results passed to a plugin's executor function.
 */
interface CompilationResult {
  /**
   * The complete configuration object loaded from `coffee.config.cjs`.
   * (Typed as `any` to prevent circular type definitions, but it conforms to the `Config` interface).
   */
  config: any;

  /**
   * An array of absolute paths to the compiled .js and .js.map files.
   */
  compiledFiles: string[];

  /**
   * The stdout from the coffee compiler.
   * (Note: In watch mode, this will be a placeholder string like '(watch mode)').
   */
  stdout: string;

  /**
   * The stderr from the coffee compiler.
   */
  stderr: string;
}

/**
 * Defines the function returned by a plugin's setup function.
 * This function is executed by Milkee after a successful compilation.
 * It can be synchronous or asynchronous (return a Promise).
 */
type PluginExecutor = (result: CompilationResult) => void | Promise<void>;

/**
 * (Optional) Additional options/plugins for the Milkee builder.
 */
interface MilkeeConfig {
  options?: {
    /**
     * Before compiling, reset the directory.
     */
    refresh?: boolean;
    /**
     * Before compiling, confirm "Do you want to Continue?"
     */
    confirm?: boolean;
    copy?: boolean;
  };
  /**
   * (Optional) An array of plugin executor functions.
   *
   * A plugin executor is the function *returned* by your plugin's setup function
   * (which is what you `require` in your config).
   *
   * @example
   * // coffee.config.cjs
   * const myPlugin = require('./plugins/my-plugin.js');
   *
   * module.exports = {
   *   // ...
   *   milkee: {
   *     plugins: [
   *       // This call returns the PluginExecutor
   *       myPlugin({ option: 'value' }),
   *       // ...
   *     ]
   *   }
   * }
   */
  plugins?: PluginExecutor[];
}

/**
 * Defines the shape of the coffee.config.js configuration object for Milkee.
 * This is the main type to be imported.
 */
export interface Config {
  /**
   * The entry point for compilation.
   * This can be a single file or a directory.
   */
  entry: string;

  /**
   * The output for the compiled JavaScript files.
   * If 'options.join' is true, this should be a single file path (e.g., 'dist/app.js').
   * If 'options.join' is false, this should be a directory (e.g., 'dist').
   */
  output: string;

  options?: CoffeeOptions;
  milkee?: MilkeeConfig;
}
