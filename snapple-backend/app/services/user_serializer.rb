class UserSerializer
 
    def initialize(user_object)
        @user = user_object
    end
   
    def to_serialized_json
        @user.to_json(
            :include => {
                :games => {
                    :include => {
                    :snake => {:only => [:body, :direction]},
                    :consumables => {:only => :position}
                    }, :except => [:created_at, :updated_at, :user_id]
                }
        }, :except => [:created_at, :updated_at])
    end
    

end