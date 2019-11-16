import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Review } from 'src/reviews/review.entity';

@Entity({ name: 'accounts' })
export class User {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  id: number;
  @OneToOne(type => Profile)
  @JoinColumn({ name: 'account_user_id' })
  profile: Profile;
  @Column({ name: 'account_username', nullable: false })
  username: string;
  @Column({ name: 'account_password', nullable: false })
  password: string;
  @Column({ name: 'account_mail', nullable: false })
  mail: string;
  @Column({ name: 'account_country', nullable: false, default: 'Unknown' })
  country: string;
  @Column({ name: 'account_avatar_url', nullable: true })
  avatarUrl: string;
  @Column({ name: 'account_role', nullable: true })
  role: string;
  @OneToMany(type => Review, review => review.author)
  reviews: Review[];
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'account_edited_at',
  })
  editedAt: string;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'account_created_at',
  })
  createdAt: string;
}
