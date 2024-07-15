import GenerateUUID from 'react-native-uuid';

export function getNewId() {
	return GenerateUUID.v4().toString();
}
