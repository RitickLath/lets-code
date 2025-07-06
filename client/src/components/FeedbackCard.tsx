interface FeedbackCardProps {
  message: string;
  name: string;
  username: string;
  icon: string;
}

const FeedbackCard = ({ message, name, username, icon }: FeedbackCardProps) => {
  return (
    <div className="max-w-[350px] w-full p-4 rounded-md bg-[#2e2e2e] border border-[#3a3a3a] shadow-md">
      <p className="text-sm text-white">{message}</p>
      <div className="flex items-center space-x-4 pt-6">
        <img className="rounded-full w-[28px] h-[28px]" src={icon} alt={name} />
        <div className="text-sm">
          <h1 className="text-white font-medium">{name}</h1>
          <h2 className="text-[#92959c]">@{username}</h2>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
