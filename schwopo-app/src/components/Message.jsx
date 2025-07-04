import Typography from '@mui/material/Typography';

function Message({message, author})
{
  return (
    <Typography>
      {author}: {message}
    </Typography>
  )
}

export default Message;