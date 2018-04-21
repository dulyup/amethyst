import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';

const BadgeExampleContent = () => (
    <div>
        <Badge
            badgeContent={<IconButton tooltip="Upload Picture"><UploadIcon /></IconButton>}
        >
        </Badge>

    </div>
);

export default BadgeExampleContent;