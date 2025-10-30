import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: '1', name: 'Alice', role: 'admin' },
    { id: '2', name: 'Bob', role: 'user' },
    { id: '3', name: 'Charlie', role: 'guest' },
  ];

  findAll(role?: ['admin', 'user', 'guest']) {
    if (role) {
      const rolesArray = this.users.filter(
        (user) => user.role === role.toString(),
      );
      if (rolesArray.length === 0) {
        throw new NotFoundException(`No users found with role ${role}`);
      }
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id.toString());

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  create(user: CreateUserDto) {
    const newUser = { id: (this.users.length + 1).toString(), ...user };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, user: UpdateUserDto) {
    const existingUserIndex = this.users.findIndex(
      (user) => user.id === id.toString(),
    );
    if (existingUserIndex === -1) {
      return null;
    }
    const updatedUser = { ...this.users[existingUserIndex], ...user };
    this.users[existingUserIndex] = updatedUser;
    return updatedUser;
  }
  remove(id: number) {
    const existingUserIndex = this.users.findIndex(
      (user) => user.id === id.toString(),
    );
    if (existingUserIndex === -1) {
      return null;
    }
    const removedUser = this.users.splice(existingUserIndex, 1);
    return removedUser[0];
  }
}
