import { Todo } from '../../types/Todo';
import { User } from '../../types/user';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

const getUserById = (id: number): User | undefined => {
  return usersFromServer.find(user => user.id === id);
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
