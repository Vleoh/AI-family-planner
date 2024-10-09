import React, { useContext, useEffect } from 'react';
import FamilyContext from '../../context/family/familyContext';
import AIContext from '../../context/ai/aiContext';

const Dashboard: React.FC = () => {
  const familyContext = useContext(FamilyContext);
  const aiContext = useContext(AIContext);

  const { family, getFamily, loading } = familyContext;
  const { resolveDispute, suggestActivity } = aiContext;

  useEffect(() => {
    getFamily();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {family && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Family: {family.name}</h2>
          <h3 className="text-lg font-semibold mb-2">Members:</h3>
          <ul className="list-disc list-inside mb-4">
            {family.members.map((member: any) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
          <ul className="list-disc list-inside mb-4">
            {family.tasks.map((task: any) => (
              <li key={task._id}>{task.description}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Events:</h3>
          <ul className="list-disc list-inside mb-4">
            {family.events.map((event: any) => (
              <li key={event._id}>{event.title}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
        <button
          onClick={() => resolveDispute('Who should do the dishes tonight?')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Resolve Dispute
        </button>
        <button
          onClick={() => suggestActivity('park, movies', 'New York')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Suggest Activity
        </button>
      </div>
    </div>
  );
};

export default Dashboard;