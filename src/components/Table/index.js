import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { Button } from '../Button'
import Sort from '../Sort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse()
}

const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }
class Table extends Component {
	constructor (props) {
		super(props)
		this.state = {
			sortKey: 'NONE',
			isSortReverse: false
		}
		this.onSort = this.onSort.bind(this)
	}
	onSort (sortKey) {
		this.setState(prevState => {
			const isSortReverse = prevState.sortKey === sortKey && !prevState.isSortReverse
			return { sortKey, isSortReverse }
		})
	}
	render () {
		const {
			list,
			onDismiss
		} = this.props

		const {
			sortKey,
			isSortReverse
		} = this.state

		const sortedList = SORTS[sortKey](list)
		const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

		return (
		<div className="table">
			<div className="table-header">
				<span style={largeColumn}>
					<Sort sortKey={"TITLE"} onSort={this.onSort} activeSortKey={sortKey}>Title</Sort>
					{
						sortKey === 'TITLE' &&
						(isSortReverse ? <FontAwesomeIcon icon='sort-down' />
						: <FontAwesomeIcon icon='sort-up' />)
					}
				</span>
				<span style={midColumn}>
					<Sort sortKey={"AUTHOR"} onSort={this.onSort} activeSortKey={sortKey}>Author</Sort>
					{
						sortKey === 'AUTHOR' &&
						(isSortReverse ? <FontAwesomeIcon icon='sort-down' />
						: <FontAwesomeIcon icon='sort-up' />)
					}
				</span>
				<span style={smallColumn}>
					<Sort sortKey={"COMMENTS"} onSort={this.onSort} activeSortKey={sortKey}>Comments</Sort>
					{
						sortKey === 'COMMENTS' &&
						(isSortReverse ? <FontAwesomeIcon icon='sort-down' />
						: <FontAwesomeIcon icon='sort-up' />)
					}
				</span>
				<span style={smallColumn}>
					<Sort sortKey={"POINTS"} onSort={this.onSort} activeSortKey={sortKey}>Points</Sort>
					{
						sortKey === 'POINTS' &&
						(isSortReverse ? <FontAwesomeIcon icon='sort-down' />
						: <FontAwesomeIcon icon='sort-up' />)
					}
				</span>
				<span style={smallColumn}>
					Archive
		</span>
			</div>
			{reverseSortedList.map(item => (
				<div key={item.objectID} className="table-row">
					<span style={largeColumn}>
						<a href={item.url}>{item.title}</a>
					</span>
					<span style={midColumn}>{item.author}</span>
					<span style={smallColumn}>{item.num_comments}</span>
					<span style={smallColumn}>{item.points}</span>
					<span style={smallColumn}>
						<Button
							onClick={() => onDismiss(item.objectID)}
							className="button-inline"
						>
							Dismiss
          				</Button>
					</span>
				</div>
			))}
		</div>
		)
	}
}

Table.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			objectID: PropTypes.string.isRequired,
			author: PropTypes.string,
			url: PropTypes.string,
			num_comments: PropTypes.number,
			points: PropTypes.number
		})
	).isRequired,
	onDismiss: PropTypes.func
}

export default Table