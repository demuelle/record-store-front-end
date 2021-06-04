import { DeleteIcon } from '@chakra-ui/icons';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '@chakra-ui/react';
import EditableText from './EditableText';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import api from '../../../api';

function RecordsTable({ records }) {
  const queryClient = useQueryClient();

  const deleteRecord = useMutation(id => api.delete(id));

  const updateRecord = useMutation(({ payload, id }) =>
    api.update(payload, id)
  );

  function handleUpdate(event) {
    const updatedRecord = {
      ...records.find(({ id }) => id === Number(event.target.dataset.id)),
      ...{ [event.target.dataset.key]: event.target.value },
    };

    updateRecord.mutate({
      payload: updatedRecord,
      id: event.target.dataset.id,
    });
  }

  function handleDelete(event) {
    deleteRecord.mutate(event.target.dataset.id, {
      onSuccess: async () => {
        queryClient.invalidateQueries('records');
      },
    });
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Artist</Th>
          <Th>Album</Th>
          <Th>Year</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(({ id, artist, album, year }) => (
          <Tr key={id} data-id={id}>
            <Td>
              <EditableText
                value={artist}
                handler={handleUpdate}
                recordKey="artist"
                id={id}
              />
            </Td>
            <Td>
              <EditableText
                value={album}
                handler={handleUpdate}
                recordKey="album"
                id={id}
              />
            </Td>
            <Td>
              <EditableText
                value={year}
                handler={handleUpdate}
                recordKey="year"
                id={id}
              />
            </Td>
            <Td>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="teal"
                variant="solid"
                size="xs"
                onClick={handleDelete}
                data-id={id}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

RecordsTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.exact({
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default RecordsTable;
