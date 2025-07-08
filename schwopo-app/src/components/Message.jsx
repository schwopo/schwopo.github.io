import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Message({message, author})
{
  return (
    <>
    <Paper sx={{padding: 1}}>
      <Typography variant="button">{author}:</Typography>
      <Typography variant="body1">	{message}</Typography>
</Paper>
    </>
  );
}

export default Message;