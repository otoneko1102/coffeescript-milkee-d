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
  };
  plugins?: any[];
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
