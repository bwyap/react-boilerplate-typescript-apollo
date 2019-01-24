export interface LanguageProviderProps {
  messages: any;
}

export interface LanguageProviderStateProps {
  locale: string;
}
export interface LanguageProviderDispatchProps {}

export interface LanguageProviderMergedProps
  extends LanguageProviderProps,
    LanguageProviderStateProps,
    LanguageProviderDispatchProps {}

export interface LanguageProviderState {}
