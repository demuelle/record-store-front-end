import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function EditableText({ value, recordKey, id, handler }) {
  return (
    <Editable
      defaultValue={value}
      className="flex gap-2 items-center text-yellow-600"
    >
      <EditablePreview />
      <EditableInput
        data-key={recordKey}
        data-id={id}
        onBlur={handler}
        onChange={handler}
        size="xs"
      />
    </Editable>
  );
}

EditableText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  recordKey: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default EditableText;
