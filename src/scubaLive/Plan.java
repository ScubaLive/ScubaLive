package scubaLive;

public class Plan {

	private int numdives;
	private DiveTable divet;
	private SurfaceTable surfacet;
	private Dive dive1;
	private Dive dive2;
	private Dive dive3;
	SurfaceInterval si1;
	SurfaceInterval si2;
	private boolean safe;
	//int altitude;
	
	
	public Plan(DiveTable dtable, SurfaceTable stable) {
		divet = dtable;
		surfacet = stable;
		dive1 = new Dive(divet, surfacet, 1);
		numdives = 1;
		dive2 = null;
		dive3 = null;
		si1 = null;
		si2 = null;
		safe = true;
	}
	
	public void updateNum(int divenumber) {
		int diff = 0;
		
		if (divenumber > 0 && divenumber < 4) {
			diff = divenumber - numdives;
			
			//increasing number of dives
			if (diff > 0) {
				while (diff > 0) {
					numdives++;
					if (numdives == 2) {
						if (dive2 == null) {
							dive2 = new Dive(divet, surfacet, 2);
							si1 = new SurfaceInterval(dive1, dive2, surfacet);
						}
					}
					if (numdives == 3) {
						if (dive3 == null) {
							dive3 = new Dive(divet, surfacet, 3);
							si2 = new SurfaceInterval(dive2, dive3, surfacet);
						}
						
					}
					
					diff--;
				}
				
			}
			
			//decreasing number of dives
			if (diff < 0) {
				numdives = divenumber;
				this.updateSafe();
			}
				
		} else {
			
			throw new IllegalArgumentException("Invalid number of dives");
			
		}
		
	}
	
	public void updateDive(int diveid, int time, int depth) {
		Dive dive = null;
		char spg = 'a';
		SurfaceInterval si = null;
		
		if (diveid > 0 && diveid < 4 && diveid <= numdives) {
			if (diveid == 1) {
				dive = dive1;
				if (numdives > 1) si = si1;
			}
			if (diveid == 2) {
				dive = dive2;
				spg = si1.getFPG();
				if (numdives == 3) si = si2;
			}
			if (diveid == 3) {
				dive = dive3;
				spg = si2.getFPG();
			}
			dive.updateDive(time, depth, spg);
			if (si != null) si.updateInterval();
			
			this.updateSafe();
			
		} else { 
			
			throw new IllegalArgumentException("Invalid diveid");
			
		}
		
	}
	
	// call with negative time for min surface interval
	public void updateSI(int siid, int time) {
		SurfaceInterval si = null;
		
		if(siid == 1 || siid == 2) {
			
			if (siid == 1) si = si1;
			if (siid == 2) si = si2;
			si.updateInterval(time);
			if (time < 0) si.setMinInterval();
			if (siid == 1 && si2 != null) si2.updateInterval();
			
		} else {
			
			throw new IllegalArgumentException("Invalid siid");
			
		}
	}

	
	public void updateSafe() {
		boolean safety = true;
		
		if (numdives == 1) {
			safety = dive1.isSafe();
		}
		
		if (numdives == 2) {
			safety = dive1.isSafe() & dive2.isSafe();
		}
		
		if (numdives == 3) {
			safety = dive1.isSafe() & dive2.isSafe();
		}
		
		safe = safety;
		
	}
	
	public boolean isSafe() {
		return safe;
	}
	
	public String warnings() {
		String string = null;
		
		return string;
	}
	
	public int getDepth(int diveid) {
		
		return idHelper(diveid).getDepth();
		
	}
	
	public int getBT(int diveid) {
		
		return idHelper(diveid).getBT();
		
	}
	
	private Dive idHelper(int diveid) {
		Dive result = null;
		
		if (diveid == 1) result = dive1;
		if (diveid == 2) result = dive2;
		if (diveid == 3) result = dive3;
		
		return result;
	}
	
	public String diveString(int diveid) {
		String string = null;
		
		string = idHelper(diveid).toString();
		
		return string;
	}
	
	public int getNum() {
		return numdives;
	}
	
	@Override
	public String toString() {
		String string = null;
		
		if (numdives == 1) {
			string = dive1.toString();
		}
		
		if (numdives == 2) {
			string = dive1.toString() + si1.toString() + dive2.toString();
		}
		
		if (numdives == 3) {
			string = dive1.toString() + si1.toString() + dive2.toString() + si2.toString() + dive3.toString();
		}
		
		return string;
	}
	

}