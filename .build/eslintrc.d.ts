export declare let parser: string;
export declare namespace parserOptions {
    let project: string;
    let tsconfigRootDir: string;
    let sourceType: string;
}
export declare let plugins: string[];
declare let _extends: string[];
export { _extends as extends };
export declare let root: boolean;
export declare namespace env {
    let node: boolean;
    let jest: boolean;
}
export declare let ignorePatterns: string[];
export declare let rules: {
    '@typescript-eslint/interface-name-prefix': string;
    '@typescript-eslint/explicit-function-return-type': string;
    '@typescript-eslint/explicit-module-boundary-types': string;
    '@typescript-eslint/no-explicit-any': string;
    'no-unused-vars': string;
    'import/order': (string | {
        groups: string[];
        'newlines-between': string;
        alphabetize: {
            order: string;
            caseInsensitive: boolean;
        };
    })[];
};
