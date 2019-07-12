def user_avatar_path(instance,filename):
    import os
    ext = os.path.splitext(filename)[-1]
    return 'avatar/' + instance.username + '_avatar' + ext