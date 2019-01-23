/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect, MapStateToProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from '../../../containers/App/store/selectors';
import ListItem from '../../../components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import { MyReducerState } from '../../../typings/store';
import { RepoListItemMergedProps, RepoListItemStateProps } from '../types';

export class RepoListItem extends React.PureComponent<RepoListItemMergedProps> {
  static propTypes = {
    currentUser: PropTypes.string,
    // FIXME: not sure why Typescript throws error when this section is uncommented.
    // item: PropTypes.shape({
    //   owner: PropTypes.shape({
    //     login: PropTypes.string.isRequired,
    //   }),
    //   name: PropTypes.string.isRequired,
    //   full_name: PropTypes.string.isRequired,
    //   html_url: PropTypes.string.isRequired,
    //   open_issues_count: PropTypes.number.isRequired,
    // }),
  };

  render() {
    const { item } = this.props as any;

    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    }

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <RepoLink href={item.html_url} target="_blank">
          {nameprefix + item.name}
        </RepoLink>
        <IssueLink href={`${item.html_url}/issues`} target="_blank">
          <IssueIcon />
          <FormattedNumber value={item.open_issues_count} />
        </IssueLink>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
  }
}

const mapStateToProps: MapStateToProps<
  RepoListItemStateProps,
  RepoListItemMergedProps,
  MyReducerState
> = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export default connect(mapStateToProps)(RepoListItem);
