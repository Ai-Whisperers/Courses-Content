
// --- AI GENERATED CAD SCRIPT ---
// Mission: 0.9kg Drone
// Wingspan: 1.34m

$fn = 50;

module fuselage() {
    scale([1, 0.15, 0.15]) sphere(r=90.0);
}

module wing() {
    translate([0, -670.0, 0])
    cube([200, 1340.0, 20]);
}

module motor() {
    cylinder(h=30, r=1.8);
}

// Assembly
union() {
    fuselage();
    translate([50, 0, 10]) wing();
    translate([-100, 0, 0]) motor(); // Pusher configuration
}
        