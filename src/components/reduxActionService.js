export function ReduxActionService()
{}
ReduxActionService.UpdateDecks = ( newData ) =>
{
	return {
		type: 'UPDATE_DECKS',
		newData: newData
	}
};