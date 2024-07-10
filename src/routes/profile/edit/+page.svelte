<script>
    import NavBar from '../../components/navigationBar.svelte';
    import EditProfile from '../../components/editProfile.svelte';
    import EditWork from '../../components/editWork.svelte';
    import EditEducation from '../../components/editEducation.svelte';
  </script>
  
  <div class="flex items-start justify-center w-svw h-auto relative">
    <div class="w-auto sticky top-0 left-0">
      <NavBar />
    </div>
    <div class="w-full h-auto min-h-svh pt-8 pr-8 pb-8 overflow-x-auto">
      <div class="bg-[#FFFFFF] w-full h-auto min-h-svh rounded-[25px] p-4">
            <span class="p-4 text-lg font-bold">Edit Profile</span>
            <div class="w-full flex items-start justify-between space-x-5">
                <span class="w-[50%] shadow-xl rounded-[10px]"><EditProfile /></span>
                <span class="w-[50%] flex flex-col space-y-5">
                  <span class="shadow-xl rounded-[10px] "><EditWork /></span>
                  <span class="shadow-xl rounded-[10px] "><EditEducation /></span>
                </span>
            </div>
      </div>
    </div>
  </div>
  