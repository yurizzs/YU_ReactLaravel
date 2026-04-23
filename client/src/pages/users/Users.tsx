import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
} from '../../components/ui/table/Table';
import { Button, ToastProvider } from '../../components/ui';
import { MainLayout } from '../../components/layouts';
import CreateUserModal from './components/CreateUserModal';

/* =========================
   DATA
========================= */
const users = [
  { name: "John Doe", role: "Admin" },
  { name: "Jane Smith", role: "User" },
  { name: "Mark Lee", role: "Editor" },
  { name: "Anna Cruz", role: "User" },
  { name: "Paul Reyes", role: "Admin" },
];

/* =========================
   TYPES
========================= */
type User = typeof users[number];

type SortState = {
  key: keyof User;
  direction: "asc" | "desc";
};

const Users = () => {

  const [sort, setSort] = useState<SortState>({
    key: "name",
    direction: "asc",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* =========================
     SORT HANDLER
  ========================= */
  const handleSort = (key: keyof User) => {
    setSort((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  /* =========================
     SORT DATA
  ========================= */
  const sortedData = [...users].sort((a, b) => {
    const valA = a[sort.key];
    const valB = b[sort.key];

    if (valA < valB) return sort.direction === "asc" ? -1 : 1;
    if (valA > valB) return sort.direction === "asc" ? 1 : -1;
    return 0;
  });

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginated = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

   /* =========================
     MODAL STATE
  ========================= */
  const [isCreateUserModalOpen, setIsCreateModalOpen] = useState(false);

  /* =========================
     UI
  ========================= */
  const content = (
    <div className="space-y-4">
      <div>
        <Button variant='primary' iconName='FaPlus' onClick={() => setIsCreateModalOpen(true)}>
          Create User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <tr>
            <TableCell
              isHeader
              sortKey="name"
              currentSort={sort}
              onSort={handleSort}
            >
              Name
            </TableCell>

            <TableCell
              isHeader
              sortKey="role"
              currentSort={sort}
              onSort={handleSort}
            >
              Role
            </TableCell>
          </tr>
        </TableHeader>

        <TableBody>
          {paginated.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        totalResults={users.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ToastProvider />
    </div>
  );

  return <MainLayout content={content} />;
};

export default Users;