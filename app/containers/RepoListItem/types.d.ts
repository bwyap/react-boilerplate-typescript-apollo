/**
 *
 * RepoListItem type definitions
 *
 */

// Props that should be passed to RepoListItem manually
export interface RepoListItemProps {
  item?: {
    owner: {
      login: string;
    };
    name: string;
    full_name: string;
    html_url: string;
    open_issues_count: number;
  };
}

// Props that should be passed to RepoListItem through MapStateToProps
export interface RepoListItemStateProps {
  currentUser?: string;
}

// All props that are passed to RepoListItem
export interface RepoListItemMergedProps
  extends RepoListItemProps,
    RepoListItemStateProps {}
